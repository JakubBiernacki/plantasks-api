import { Args, Query, Resolver } from '@nestjs/graphql';
import { Type, UseGuards } from '@nestjs/common';
import { IBaseService } from './base-service.interface';
import { GetIdArgs } from '../dto/getId.args';
import { PaginationArgs } from '../dto/pagination.args';
import { RolesGuard } from '../guards/roles.guard';
import { GqlAuthGuard } from '../guards/jwt-gqlAuth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../modules/users/enums/role.enum';

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    protected constructor(private baseService: IBaseService<T>) {}

    @Roles(Role.Admin)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Query(() => [classRef], { name: `findAll${classRef.name}` })
    async findAll(@Args() pagination: PaginationArgs): Promise<T[]> {
      return this.baseService.findAll(pagination);
    }

    @Query(() => classRef, { name: `findOne${classRef.name}` })
    async findOne(@Args() { id }: GetIdArgs): Promise<T> {
      return this.baseService.findOne(id);
    }
  }
  return BaseResolverHost;
}
