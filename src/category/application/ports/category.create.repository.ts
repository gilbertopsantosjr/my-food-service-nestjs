import {
  CreateCategoryDto,
  ResponseCategoryDto
} from '@/category/model/category.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryCreateRepository {
  abstract execute(
    category: CreateCategoryDto
  ): Promise<ResponseCategoryDto | null>
}
