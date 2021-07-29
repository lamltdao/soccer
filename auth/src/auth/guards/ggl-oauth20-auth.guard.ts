import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GGlOauth20AuthGuard extends AuthGuard('google') {}
