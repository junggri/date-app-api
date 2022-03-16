import {Module} from "@nestjs/common";
import {UserService} from "@src/User/user.service";
import {UserResolver} from "@src/User/user.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "@src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [
    UserService
  ]
})
export class UserModule {

}
