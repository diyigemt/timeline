// eslint-disable-next-line import/prefer-default-export
export const RaidDifficultySelect = [
  {
    value: 0,
    label: "N",
  },
  {
    value: 1,
    label: "H",
  },
  {
    value: 2,
    label: "VH",
  },
  {
    value: 3,
    label: "HC",
  },
  {
    value: 4,
    label: "EX",
  },
  {
    value: 5,
    label: "IS",
  },
];
export const RaidDifficultyMap = {};
RaidDifficultySelect.forEach((item) => {
  Reflect.set(RaidDifficultyMap, item.value, item.label);
});
