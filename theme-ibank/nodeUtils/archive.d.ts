export {};
declare global {
  type ArchiveDay = Node[];

  interface ArchiveMonth {
    [day: string]: ArchiveDay;
  }

  interface ArchiveYear {
    [month: string]: ArchiveMonth;
  }

  interface Archive {
    [year: string]: ArchiveYear;
  }
}
