import { EmploymentResponseHistoryDto } from '../dto/employment-response-history.dto';
import { EmploymentHistory } from '../entities/employment-history.entity';

export function toEmploymentResponseDto(
  entity: EmploymentHistory,
): EmploymentResponseHistoryDto {
  const { techstacks, user, ...rest } = entity;
  return {
    ...rest,
    techstacks: techstacks?.map((t) => ({ name: t.name })) || [],
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
    },
  };
}
