import { UserEntity } from 'src/users/entity/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    register(body: CreateUserDto): Promise<UserEntity | never>;
    private login;
}
