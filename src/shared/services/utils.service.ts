import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/--+/g, '-');
  }

  paginate<T>(
    items: T[],
    page: number,
    limit: number,
  ): { data: T[]; total: number; page: number; pages: number } {
    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);
    return {
      data,
      total: items.length,
      page,
      pages: Math.ceil(items.length / limit),
    };
  }
}
