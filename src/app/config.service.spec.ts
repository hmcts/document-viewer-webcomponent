import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { TransferState } from '@angular/platform-browser';

describe('ConfigService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ConfigService, TransferState ]
        });
    });

    it('should be created', inject([ ConfigService ], (service: ConfigService) => {
        expect(service).toBeTruthy();
    }));

});
