import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CurrentOkrviewService } from '../../../current-okrview.service';
import { ContextRole } from '../../../../shared/services/helper/department-context-role.service';
import { DepartmentUnit } from '../../../../shared/model/ui/OrganizationalUnit/department-unit';
import { CycleUnit } from '../../../../shared/model/ui/cycle-unit';
import { DepartmentMapper } from '../../../../shared/services/mapper/department.mapper';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { DepartmentStructureRole } from '../../../../shared/model/ui/department-structure';
import { User } from '../../../../shared/model/api/user';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-department-tab-team',
  templateUrl: './department-tab-team.component.html',
  styleUrls: ['./department-tab-team.component.scss']
})
export class DepartmentTabTeamComponent implements OnInit, OnDestroy {
  @Input() department: DepartmentUnit;
  @Input() currentUserRole: ContextRole;
  @Input() cycle: CycleUnit;

  isProcessingSave = false;
  canEditManagers = false;
  canEditMembers = false;
  subscriptions: Subscription[] = [];

  constructor(
    private departmentMapperService: DepartmentMapper,
    private currentUserService: CurrentUserService,
    private currentOkrViewService: CurrentOkrviewService,
    private matDialog: MatDialog,
    private i18n: I18n
  ) {}

  ngOnInit(): void {
    this.canEditManagers = (this.cycle.isCycleActive() || this.cycle.isCycleInPreparation()) && this.currentUserRole.isAtleastAdmin();
    this.canEditMembers = (this.cycle.isCycleActive() || this.cycle.isCycleInPreparation()) && this.currentUserRole.isAtleastOKRManager();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
    this.subscriptions = [];
  }

  getAlreadyDefinedUserIds(): string[] {
    const existingIds: string[] = [];
    if (this.department.okrMasterId) {
      existingIds.push(this.department.okrMasterId);
    }
    if (this.department.okrTopicSponsorId) {
      existingIds.push(this.department.okrTopicSponsorId);
    }
    this.department.okrMemberIds.forEach(currentId => existingIds.push(currentId));

    return existingIds;
  }

  clickedDeleteOKRMaster(): void {
    const title: string = this.i18n({
      id: 'deleteOkrMasterDialog_title',
      value: 'OKR Master entfernen'
    });
    const message: string = this.i18n({
      id: 'deleteOkrMasterDialog_message',
      value: 'Möchten Sie dies tun? Dieser Benutzer wird seine Managerrechte für dieses Team verlieren.'
    });
    const confirmButtonText: string = this.i18n({
      id: 'deleteOkrMasterDialog_confirmButtonText',
      value: 'Entfernen'
    });
    const data: ConfirmationDialogData = {
      confirmButtonText,
      title,
      message
    };
    const dialogReference: MatDialogRef<ConfirmationDialogComponent, string> = this.matDialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data
    });

    this.subscriptions.push(
      dialogReference
        .afterClosed()
        .pipe(take(1))
        .subscribe(isConfirmed => {
          if (isConfirmed) {
            this.deleteOkrMaster();
          }
        })
    );
  }

  deleteOkrMaster(): void {
    this.department.okrMasterId = undefined;
    this.updatedUserList();
  }

  clickedDefineOKRMaster(user: User): void {
    this.department.okrMasterId = user.id;
    this.updatedUserList();
  }

  clickedDeleteOKRTopicSponsor(): void {
    const title: string = this.i18n({
      id: 'deleteOkrTopicSponsorDialog_title',
      value: 'OKR Themenpate entfernen'
    });
    const message: string = this.i18n({
      id: 'deleteOkrTopicSponsorDialog_message',
      value: 'Möchten Sie dies tun? Dieser Benutzer wird seine Managerrechte für dieses Team verlieren.'
    });
    const confirmButtonText: string = this.i18n({
      id: 'deleteOkrTopicSponsorDialog_title_confirmButtonText',
      value: 'Entfernen'
    });
    const data: ConfirmationDialogData = {
      confirmButtonText,
      title,
      message
    };
    const dialogReference: MatDialogRef<ConfirmationDialogComponent, string> = this.matDialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data
    });

    this.subscriptions.push(
      dialogReference
        .afterClosed()
        .pipe(take(1))
        .subscribe(isConfirmed => {
          if (isConfirmed) {
            this.deleteOkrTopicSponsor();
          }
        })
    );
  }

  deleteOkrTopicSponsor(): void {
    this.department.okrTopicSponsorId = undefined;
    this.updatedUserList();
  }

  clickedDefineOKRTopicSponsor(user: User): void {
    this.department.okrTopicSponsorId = user.id;
    this.updatedUserList();
  }

  clickedDeleteOKRMember(memberId: string): void {
    const title: string = this.i18n({
      id: 'deleteOkrMemberDialog_title',
      value: 'Mitglied entfernen'
    });
    const message: string = this.i18n({
      id: 'deleteOkrMemberDialog_message',
      value: 'Möchten Sie dieses Mitglied von dem Team entfernen? Der Benutzer wird seine Mitgliedsrechte in diesem Team verlieren.'
    });
    const confirmButtonText: string = this.i18n({
      id: 'deleteOkrMemberDialog_confirmButtonText',
      value: 'Entfernen'
    });
    const data: ConfirmationDialogData = {
      confirmButtonText,
      title,
      message
    };
    const dialogReference: MatDialogRef<ConfirmationDialogComponent, string> = this.matDialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data
    });

    this.subscriptions.push(
      dialogReference
        .afterClosed()
        .pipe(take(1))
        .subscribe(isConfirmed => {
          if (isConfirmed) {
            this.deleteOkrMember(memberId);
          }
        })
    );
  }

  deleteOkrMember(memberId: string): void {
    const memberIndex: number = this.department.okrMemberIds.indexOf(memberId);
    this.department.okrMemberIds.splice(memberIndex, 1);
    this.updatedUserList();
  }

  clickedDefineOKRMember(user: User): void {
    if (this.department.okrMemberIds.includes(user.id)) {
      return;
    }
    this.department.okrMemberIds.push(user.id);
    this.updatedUserList();
  }

  async updatedUserList(): Promise<void> { // TODO: decide what to do with the promises
    this.querySaveTeam();
    let newRole: DepartmentStructureRole;
    const currentUserId: string = await this.getCurrentUserIdPromiseFromUserService();

    if (this.department.okrMasterId === currentUserId || this.department.okrTopicSponsorId === currentUserId) {
      newRole = DepartmentStructureRole.MANAGER;
    } else if (this.department.okrMemberIds.includes(currentUserId)) {
      newRole = DepartmentStructureRole.MEMBER;
    } else {
      newRole = DepartmentStructureRole.USER;
    }

    this.currentOkrViewService.updateDepartmentStructureTeamRole(this.department.id, newRole);
  }

  querySaveTeam(): void {
    this.departmentMapperService
      .putDepartment$(this.department)
      .pipe(take(1))
      .subscribe();
  }

  // TODO Fix
  async getCurrentUserIdPromiseFromUserService(): Promise<string> {
    return this.currentUserService.getCurrentUser()
      .toPromise()
      .then(curreUser => curreUser.id);
  }
}
