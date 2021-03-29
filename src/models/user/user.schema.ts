import mongoose from 'mongoose';
import { EmailValidator } from '../../validators';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 16
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: EmailValidator
      }
    }
  }
);

//https://ithelp.ithome.com.tw/articles/10244978
//CRUD 增刪讀改 新名詞