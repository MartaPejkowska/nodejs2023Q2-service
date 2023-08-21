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
exports.AuthHelper = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entity/user.entity");
let AuthHelper = class AuthHelper {
    constructor(jwt) {
        this.jwt = jwt;
    }
    async decode(token) {
        return this.jwt.decode(token, null);
    }
    async validateUser(decoded) {
        return this.userRepository.findOne(decoded.id);
    }
    async generateToken(user) {
        const token = await this.jwt.signAsync({ id: user.id, login: user.login }, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: +process.env.TOKEN_EXPIRE_TIME,
        });
        return { accessToken: token };
    }
    async generateRefreshToken(user) {
        const refreshToken = await this.jwt.signAsync({ id: user.id, login: user.login }, {
            secret: process.env.JWT_SECRET_REFRESH_KEY,
            expiresIn: +process.env.TOKEN_REFRESH_EXPIRE_TIME,
        });
        return { refreshToken: refreshToken };
    }
    async generateBothTokens(user) {
        const [accessToken, refreshToken] = await Promise.all([
            await this.jwt.signAsync({ id: user.id, login: user.login }, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: +process.env.TOKEN_EXPIRE_TIME,
            }),
            await this.jwt.signAsync({ id: user.id, login: user.login }, {
                secret: process.env.JWT_SECRET_REFRESH_KEY,
                expiresIn: +process.env.TOKEN_REFRESH_EXPIRE_TIME,
            }),
        ]);
        const tokens = { accessToken, refreshToken };
        return tokens;
    }
    isPasswordValid(password, userPassword) {
        return bcrypt.compareSync(password, userPassword);
    }
    async validateRefreshToken(refreshToken) {
        try {
            const decoded = this.jwt.verify(refreshToken);
            if (!decoded) {
                throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
            }
            console.log(decoded);
            const user = await this.validateUser(decoded);
            console.log(user);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refresh_token);
            if (!isRefreshTokenMatching) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            await this.jwt.verifyAsync(refreshToken, {
                secret: process.env.JWT_SECRET_REFRESH_KEY,
            });
            return true;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async updateRefreshtoken(userId) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        const newRefreshToken = await this.generateRefreshToken(user);
        return await (user.refresh_token = newRefreshToken.refreshToken);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_2.Repository)
], AuthHelper.prototype, "userRepository", void 0);
AuthHelper = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthHelper);
exports.AuthHelper = AuthHelper;
//# sourceMappingURL=auth.helper.js.map