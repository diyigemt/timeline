import { BulletType, ArmorType, RaidSkillType } from "@/interface";

export interface RaidSkill {
  name: string; // 技能名称
  type: RaidSkillType; // 技能类型 (主动/被动)
  bulletType: BulletType; // 追加伤害类型, 目前只有IS才有
  description: string; // 技能描述
  activeDifficulty: number; // 在什么难度下生效
  cost: number; // ATG条需求
  descriptionParameters: string[][]; // 在不同难度下的描述替换
}

export interface RaidEvent {
  id: number;
  name: string;
}

export interface RaidData {
  stability: number; // 稳定值
  attack: number; // 攻击力
  hp: number; // 血量
  defense: number; // 防御力
  heal: number; // 治愈值
  dodge: number; // 闪避值
  accuracy: number; // 准确度
  critical: number; // 暴击
  criticalResist: number; // 爆抗
  criticalDamageResistRate: number; // 暴击伤害减免率
  moveSpeed: number; // 移速
  ammoCount: number; // 弹匣容量
  ammoCost: number; // 射击hit数
  range: number; // 射程
  damagedRatio: number; // 伤害乘数?
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
  events: RaidEvent[]; // 特殊情况
  baseData: RaidData[]; // 基础数据
}
