import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from "path";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import depthLimit from 'graphql-depth-limit';
import * as config from "../ormconfig";
import {RegisterModule} from "@src/Register/Register.module";
import {AttendanceModule} from "@src/Attendance/Attendance.module";
import {PlaceModule} from "@src/Place/Place.module";
import {RecordModule} from "@src/Record/Record.module";
import {UserModule} from "@src/User/user.module";
import {RestModule} from "@src/Rest/Rest.module";
import {PictureModule} from "@src/Picture/Picture.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: true,
        credentials: true,
      },
      validationRules: [
        depthLimit(8)
      ],
      context: ({req, res}) => ({req, res}),
    }),
    RegisterModule,
    AttendanceModule,
    RecordModule,
    UserModule,
    PlaceModule,
    RestModule,
    PictureModule,
  ],
})


export class AppModule {
}




