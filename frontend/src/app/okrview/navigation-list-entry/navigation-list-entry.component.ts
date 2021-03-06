import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrentOkrviewService, DepartmentNavigationInformation } from '../current-okrview.service';
import { Subscription } from 'rxjs';
import { DepartmentStructure, DepartmentStructureRole } from '../../shared/model/ui/department-structure';

@Component({
  selector: 'app-navigation-list-entry',
  templateUrl: './navigation-list-entry.component.html',
  styleUrls: ['./navigation-list-entry.component.scss']
})
export class NavigationListEntryComponent implements OnInit, OnDestroy {
  @Input() structure: DepartmentStructure;
  @Input() isSecondStructure: boolean = true;
  @Input() startsOpen: boolean = false;

  currentNavigationInformation = new DepartmentNavigationInformation(-1, []);
  navigationInformationSubscription: Subscription;
  isOpen = false;

  constructor(private currentOkrViewService: CurrentOkrviewService) {}

  ngOnInit(): void {
    if (this.startsOpen) {
      this.isOpen = true;
    }
    this.navigationInformationSubscription = this.currentOkrViewService
      .getCurrentNavigationInformation$()
      .subscribe(x => {
        this.currentNavigationInformation = x;
        if (!(this.currentNavigationInformation.departmentsToOpen.indexOf(this.structure.id) !== -1)) {
          this.isOpen = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.navigationInformationSubscription.unsubscribe();
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  hasSubStructures(): boolean {
    return this.structure.subDepartments.length > 0;
  }

  isCurrentDepartment(): boolean {
    return this.currentNavigationInformation.departmentId === this.structure.id;
  }

  isMemberOfStructure(): boolean {
    return this.structure.userRole === DepartmentStructureRole.MEMBER;
  }

  isManagerOfStructure(): boolean {
    return this.structure.userRole === DepartmentStructureRole.MANAGER;
  }
}
