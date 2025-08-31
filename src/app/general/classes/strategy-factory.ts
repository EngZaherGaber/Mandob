import { Injectable } from '@angular/core';
import { ClientStrategy } from '../../client/classes/client-strategy';
import { CompanyStrategy } from '../../company/classes/company-strategy';
import { DistributorStrategy } from '../../distributor/classes/distributor-strategy';
import { OwnerStrategy } from '../../owner/classes/owner-strategy';
import { UserStrategy } from '../interfaces/user-strategy';
import { Client } from '../../client/interfaces/client';
import { Company } from '../../company/interfaces/company';
import { Distributor } from '../../distributor/interfaces/distributor';
import { Owner } from '../../owner/interfaces/owner';

@Injectable({ providedIn: 'root' })
export class StrategyFactory {}
