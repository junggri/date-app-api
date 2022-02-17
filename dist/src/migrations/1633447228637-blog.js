"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blog1633447228637 = void 0;
class blog1633447228637 {
    constructor() {
        this.name = 'blog1633447228637';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`reply\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`bgroup\` int NOT NULL, \`sorts\` int NOT NULL, \`depth\` int NOT NULL, \`comment\` varchar(500) NOT NULL, \`writer\` varchar(40) NOT NULL, \`post_id\` int NOT NULL, \`parent_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`tag\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`likes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`identifier\` varchar(255) NOT NULL, \`post_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, \`thumbnail\` varchar(255) NULL, \`open\` tinyint NOT NULL DEFAULT 1, \`is_published\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`hit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`identifier\` char(36) NOT NULL, \`post_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`content\` varchar(1000) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(255) NOT NULL, \`hash\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`visit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`identifier\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`region_name\` varchar(255) NOT NULL, \`region_address\` varchar(255) NOT NULL, \`count\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`blog\`.\`post_tag\` (\`tag_id\` int NOT NULL, \`post_id\` int NOT NULL, INDEX \`IDX_d2fd5340bb68556fe93650fedc\` (\`tag_id\`), INDEX \`IDX_b5ec92f15aaa1e371f2662f681\` (\`post_id\`), PRIMARY KEY (\`tag_id\`, \`post_id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`reply\` ADD CONSTRAINT \`FK_26661bdd4c8727e914b5f2b10b5\` FOREIGN KEY (\`post_id\`) REFERENCES \`blog\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`likes\` ADD CONSTRAINT \`FK_741df9b9b72f328a6d6f63e79ff\` FOREIGN KEY (\`post_id\`) REFERENCES \`blog\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`hit\` ADD CONSTRAINT \`FK_53254a64aa8039f624f29c60f87\` FOREIGN KEY (\`post_id\`) REFERENCES \`blog\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`post_tag\` ADD CONSTRAINT \`FK_d2fd5340bb68556fe93650fedc1\` FOREIGN KEY (\`tag_id\`) REFERENCES \`blog\`.\`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`post_tag\` ADD CONSTRAINT \`FK_b5ec92f15aaa1e371f2662f6812\` FOREIGN KEY (\`post_id\`) REFERENCES \`blog\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`post_tag\` DROP FOREIGN KEY \`FK_b5ec92f15aaa1e371f2662f6812\``);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`post_tag\` DROP FOREIGN KEY \`FK_d2fd5340bb68556fe93650fedc1\``);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`hit\` DROP FOREIGN KEY \`FK_53254a64aa8039f624f29c60f87\``);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`likes\` DROP FOREIGN KEY \`FK_741df9b9b72f328a6d6f63e79ff\``);
            yield queryRunner.query(`ALTER TABLE \`blog\`.\`reply\` DROP FOREIGN KEY \`FK_26661bdd4c8727e914b5f2b10b5\``);
            yield queryRunner.query(`DROP INDEX \`IDX_b5ec92f15aaa1e371f2662f681\` ON \`blog\`.\`post_tag\``);
            yield queryRunner.query(`DROP INDEX \`IDX_d2fd5340bb68556fe93650fedc\` ON \`blog\`.\`post_tag\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`post_tag\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`visit\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`user\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`message\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`hit\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`post\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`likes\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`tag\``);
            yield queryRunner.query(`DROP TABLE \`blog\`.\`reply\``);
        });
    }
}
exports.blog1633447228637 = blog1633447228637;
