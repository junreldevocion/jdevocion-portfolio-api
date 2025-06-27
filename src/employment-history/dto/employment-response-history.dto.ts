export class SimpleTechstackDto {
  name: string;
}

export class SimpleUserDto {
  firstname: string;
  lastname: string;
}

export class EmploymentResponseHistoryDto {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  techstacks: SimpleTechstackDto[];
  user: SimpleUserDto;
}
