import { Injectable } from '@angular/core';

import { Profile } from '../models/profile.model';

@Injectable()
export class ProfileService {
    profile: Profile = null!;

    constructor() { }

    getProfile(): Profile {
        return this.profile;
    }

    setProfile(profile: Profile): void {
        this.profile = profile;
    }

}
