import { ObjectType, ClassType, Field, Int } from "type-graphql";
import { GoDB } from "@gogocode-package/database";

export function PaginatedResponseBase<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    // here we use the runtime argument
    @Field((type) => [TItemClass])
    // and here the generic type
    items: TItem[];

    @Field((type) => Int)
    cursor: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}

export function PaginationedResponse<TItem>(items: TItem[], count = Number(process.env.ROW_PER_PAGE_LIMIT)) {
  let itemCount = items.length;
  let hasMore = itemCount === count;
  let cursor = -1;
  if (hasMore) {
    cursor = (items[itemCount - 1] as any).id;
  }
  return {
    hasMore,
    cursor,
    items,
  };
}

export const getCursorQuery = (cursor: number) => {
  let cursorQuery = {};
  if (cursor !== 0) {
    cursorQuery = {
      id: {
        [GoDB.Op.lt]: cursor,
      },
    };
  }
  return cursorQuery;
};
