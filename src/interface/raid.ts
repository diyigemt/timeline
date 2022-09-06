import { BulletType, ArmorType, RaidSkillType } from "@/interface/index";

export type RaidDifficulty = "N" | "H" | "VH" | "HC" | "EX" | "IS";
export interface RaidSkill {
  name: string; // 技能名称
  type: RaidSkillType; // 技能类型 (主动/被动)
  bulletType: BulletType; // 追加伤害类型, 目前只有IS才有
  description: string; // 技能描述
  activeDifficulty: RaidDifficulty; // 在什么难度下生效
  cost: number; // ATG条需求
  descriptionParameters: string[][]; // 在不同难度下的描述替换
}

export interface Raid {
  id: number; // id
  devName: string; // 解包名称?
  name: string; // 名称
  profile: string; // 描述
  faction: string; // 所属
  bulletType: BulletType; // 攻击类型
  armorType: ArmorType; // 护甲类型
  skills: RaidSkill[]; // 技能
}
