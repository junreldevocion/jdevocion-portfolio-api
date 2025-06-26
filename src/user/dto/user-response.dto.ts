import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  username: string;

  @Expose()
  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
