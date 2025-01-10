import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconCamera, IconCameraRotate, IconCopy, IconFlame, IconMessageCircle, IconPlus, IconSearch, IconSettings, IconUser, IconUserCircle } from 'angular-tabler-icons/icons';
const icons = {
  IconCamera,
  IconUser,
  IconSettings,
  IconCopy,
  IconCameraRotate,
  IconFlame,
  IconUserCircle,
  IconMessageCircle,
  IconPlus,
  IconSearch

};

@NgModule({
  declarations: [],
  imports: [
    TablerIconsModule.pick(icons),
    CommonModule
  ],
  exports: [
    TablerIconsModule
  ]
})
export class IconsModule { }
