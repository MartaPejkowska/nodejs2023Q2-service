"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const artist_module_1 = require("./artist/artist.module");
const tracks_module_1 = require("./tracks/tracks.module");
const albums_module_1 = require("./albums/albums.module");
const favourites_module_1 = require("./favourites/favourites.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const loggerMiddleware_1 = require("./logger/loggerMiddleware");
const auth_module_1 = require("./authorization/auth.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(loggerMiddleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            artist_module_1.ArtistModule,
            tracks_module_1.TracksModule,
            albums_module_1.AlbumsModule,
            favourites_module_1.FavouritesModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.PG_HOST,
                port: +process.env.PG_PORT,
                username: process.env.PG_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.PG_DATABASE,
                autoLoadEntities: true,
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map