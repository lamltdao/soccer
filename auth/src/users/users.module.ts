import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { toHash } from './helpers/hash-password';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: User.name,
    useFactory: () => {
      const schema = UserSchema;
      schema.pre('save', async function(done) {
        // if password not already hashed, hash it
        if(this.isModified('password')) {
          const hashed = await toHash(this.get('password'));
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
