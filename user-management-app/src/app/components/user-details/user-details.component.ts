import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Definición de interfaces para los tipos de Google Maps
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceResult {
  address_components?: AddressComponent[];
}

declare const google: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, NgbModule],
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  loading = false;
  autocomplete: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.loadUser(userId);
    });

    if (typeof google !== 'undefined' && google.maps) {
      this.initGooglePlacesAutocomplete();
    }
  }

  private loadUser(userId: number): void {
    this.loading = true;
    this.userService.users$.subscribe(users => {
      this.user = users.find(u => u.id === userId) || null;
      if (this.user && !this.user.address) {
        this.user.address = {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'United States'
        };
      }
      this.loading = false;
    });
  }

  private initGooglePlacesAutocomplete(): void {
    const addressInput = document.getElementById('address') as HTMLInputElement;
    if (addressInput) {
      this.autocomplete = new google.maps.places.Autocomplete(addressInput, {
        componentRestrictions: { country: 'US' },
        fields: ['address_components']
      });

      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace() as PlaceResult;
        if (place?.address_components) {
          this.updateAddressFields(place.address_components);
        }
      });
    }
  }

  private updateAddressFields(components: AddressComponent[]): void {
    if (!this.user) return;

    this.user.address = this.user.address || {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States'
    };

    for (const component of components) {
      const type = component.types[0];
      switch (type) {
        case 'street_number':
          this.user.address.street = component.long_name + ' ';
          break;
        case 'route':
          this.user.address.street += component.long_name;
          break;
        case 'locality':
          this.user.address.city = component.long_name;
          break;
        case 'administrative_area_level_1':
          this.user.address.state = component.short_name;
          break;
        case 'postal_code':
          this.user.address.postalCode = component.long_name;
          break;
      }
    }
  }

  onSave(): void {
    if (this.user) {
      this.loading = true;
      const userToUpdate = {
        ...this.user,
        address: this.user.address as Required<typeof this.user.address>
      };
      
      this.userService.updateUser(userToUpdate).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}