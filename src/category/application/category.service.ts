import { CategoryDto } from '@/category/presenters/http/dto/category.dto'
import { Injectable, Logger } from '@nestjs/common'
import { CategoryFactory } from '../infrastructure/database/prisma/factories/category.factory'
import { CategoryModel } from '../model/category.model'
import { CategoryCreateRepository } from './ports/category.create.repository'
import { CategoryQueriesRepository } from './ports/category.queries.repository'

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name)
  constructor(
    private readonly createRepository: CategoryCreateRepository,
    private readonly queryRepository: CategoryQueriesRepository
  ) {}

  async create(_category: CategoryDto): Promise<CategoryModel> {
    //rules and validations that needs to check before saving the category
    // 1 - check if the restaurant exists

    // 2 - check if the category already exists for that restaurant
    const found = await this.queryRepository.findByTitleAndResturantId(
      _category.title,
      _category.restaurant.id
    )
    if (found) throw new Error('Category already exists')

    const result = await this.createRepository.execute(_category)
    this.logger.log('Category created', result)
    return CategoryFactory.toModelCreated(result)
  }

  async findById(categoryId: number): Promise<CategoryModel> {
    // adding cache here
    return await this.queryRepository.findById(categoryId)
  }

  async findAll(): Promise<CategoryModel[]> {
    // adding cache here
    return await this.queryRepository.findAll()
  }

  async findAllByRestaurantId(restaurantId: number): Promise<CategoryModel[]> {
    // adding cache here
    return await this.queryRepository.findAllByRestaurantId(restaurantId)
  }
}
