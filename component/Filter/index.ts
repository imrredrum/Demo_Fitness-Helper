export type FilterProps = {
  filter: Record<'bodyPart' | 'equipment', string[]>
  handleFilterChange: (
    target: 'bodyPart' | 'equipment',
    value: string[],
  ) => void
}

export { default } from './useFilter'
export { default as BodyPartFilter } from './BodyPartFilter'
export { default as EquipmentFilter } from './EquipmentFilter'
