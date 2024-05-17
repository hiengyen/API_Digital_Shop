import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'
import { Schema } from 'zod'

export interface UserInput {
  email: string
  name: string
  password: string
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(inputPassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  let user = this as UserDocument

  if (!user.isModified('password')) {
    return next()
  }

  //hassh password
  const salt = await bcrypt.genSalt(config.get('saltRound'))
  const hash = bcrypt.hashSync(user.password, salt)

  user.password = hash
  return next()
})

userSchema.methods.comparePassword = async function (
  inputPassword: string,
): Promise<boolean> {
  const user = this as UserDocument

  return bcrypt.compare(inputPassword, user.password).catch(e => false)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)
export default UserModel
