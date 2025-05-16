import { TestBed } from '@angular/core/testing';
import { DrinkService } from './drink.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Drink } from '../models/drink.model';

describe('DrinkService', () => {
  let service: DrinkService;
  let httpMock: HttpTestingController;

  const baseApi = 'http://localhost:5035/api'

  const mockDrinks: Drink[] = [
    {
      id: 1,
      title: 'Cola',
      price: 2.5,
      stock: 10,
      image: 'cola.png'
    },
    {
      id: 2,
      title: 'Lemonade',
      price: 2.0,
      stock: 5,
      image: 'lemonade.png'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DrinkService,
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(DrinkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all drinks', async () => {
    const promise = service.getAllDrinks();

    const req = httpMock.expectOne(baseApi + '/drinks');
    expect(req.request.method).toBe('GET');
    req.flush(mockDrinks);

    const result = await promise;
    expect(result.length).toBe(2);
  });

   it('should handle error on fetch all', async () => {
    const promise = service.getAllDrinks();

    const req = httpMock.expectOne(baseApi + '/drinks');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    await expectAsync(promise).toBeRejectedWithError('Failed to load drinks.');
  });

  it('should fetch a drink by ID', async () => {
    const promise = service.getDrinkById(2);

    const req = httpMock.expectOne(baseApi + '/drinks/2');
    expect(req.request.method).toBe('GET');
    req.flush(mockDrinks[1]);

    const result = await promise;
    expect(result.title).toBe('Lemonade');
  });

  it('should handle error when fetching by ID', async () => {
    const promise = service.getDrinkById(99);

    const req = httpMock.expectOne(baseApi + '/drinks/99');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    await expectAsync(promise).toBeRejectedWithError('Drink not found.');
  });

  it('should search drinks by query string', async () => {
    const promise = service.searchDrinks('lemon');

    const req = httpMock.expectOne(baseApi + '/drinks?search=lemon');
    expect(req.request.method).toBe('GET');
    req.flush([mockDrinks[1]]);

    const result = await promise;
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Lemonade');
  });
});
