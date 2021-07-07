import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: User.name,
    useFactory: () => {
      const schema = UserSchema;
      schema.pre('save', async function(done) {
        // if password not already hashed, hash it
        if(this.isModified('password')) {
          const hashed = await bcrypt.hash(this.get('password'), 10);
          this.set('password', hashed);
        }
        done();
      });
      return schema;
    }
  }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
