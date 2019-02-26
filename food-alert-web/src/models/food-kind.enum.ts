export enum FoodKind {
  'BLUEBERRY' = 'pop-tarts-blueberry',
  'STRAWBERRY' = 'pop-tarts-strawberry',
}

export const getFoodKindName = (type: FoodKind): string => {
  return type === FoodKind.BLUEBERRY ?
    'BLUEBERRY' :
    'STRAWBERRY';
};
