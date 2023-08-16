"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlbumDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_album_dto_1 = require("./create-album.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateAlbumDto extends (0, mapped_types_1.PartialType)(create_album_dto_1.CreateAlbumDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8 mile O.S.T.' }),
    __metadata("design:type", String)
], UpdateAlbumDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2002' }),
    __metadata("design:type", Number)
], UpdateAlbumDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a4b6a8f4-8392-4331-bf99-10f7c39d5772' }),
    __metadata("design:type", String)
], UpdateAlbumDto.prototype, "artistId", void 0);
exports.UpdateAlbumDto = UpdateAlbumDto;
//# sourceMappingURL=update-album.dto.js.map