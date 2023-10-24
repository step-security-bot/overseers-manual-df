// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { MechanicalProperties } from "./MechanicalProperties";

export interface MaterialMechanics {
  impact: MechanicalProperties;
  compressive: MechanicalProperties;
  tensile: MechanicalProperties;
  torsion: MechanicalProperties;
  shear: MechanicalProperties;
  bending: MechanicalProperties;
  maxEdge: number;
  solidDensity: number;
}
