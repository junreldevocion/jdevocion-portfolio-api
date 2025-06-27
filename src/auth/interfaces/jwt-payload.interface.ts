export interface JwtPayload {
  sub: number;
  username: string;
  role: 'ADMIN' | 'USER';
}
