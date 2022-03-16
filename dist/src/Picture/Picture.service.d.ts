import { Picture } from "@src/entities";
import { Repository } from "typeorm";
export declare class PictureService {
    private pictureRepository;
    constructor(pictureRepository: Repository<Picture>);
}
