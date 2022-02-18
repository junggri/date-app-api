import {Module} from "@nestjs/common";
import {AttendanceResolver} from "@src/Attendance/Attendance.resolver";
import {AttendanceService} from "@src/Attendance/Attendance.service";
import {Attendance} from "@src/entities";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  providers: [
    AttendanceResolver,
    AttendanceService
  ],
  exports: []
})

export class AttendanceModule {

}
