using Microsoft.AspNetCore.Authorization.Infrastructure;
using DeshawnsDogWalking.Models;
using DeshawnsDogWalking.Models.DTOs;

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Charlotte", WalkerId = 2, CityId = 3},
    new Dog { Id = 2, Name = "Mabel", WalkerId = 3, CityId = 1},
    new Dog { Id = 3, Name = "Charlie", WalkerId = 3, CityId = 2},
    new Dog { Id = 4, Name = "Samson", WalkerId = 1, CityId = 4},
    new Dog { Id = 5, Name = "Scout", WalkerId = 2, CityId = 5}
};


List<City> cities = new List<City>
{
    new City { Id = 1, Name = "Chicago"},
    new City { Id = 2, Name = "Nashville"},
    new City { Id = 3, Name = "Dickson"},
    new City { Id = 4, Name = "Springfield"},
    new City { Id = 5, Name = "Clarksville"}
};


List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Ely"},
    new Walker { Id = 2, Name = "Jaylee"},
    new Walker { Id = 3, Name = "Reiken"}
};


List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id = 1, WalkerId = 1, CityId = 1},
    new WalkerCity { Id = 2,  WalkerId = 2, CityId = 2},
    new WalkerCity { Id = 3, WalkerId = 3, CityId = 3},
    new WalkerCity { Id = 4, WalkerId = 2, CityId = 4},
    new WalkerCity { Id = 5, WalkerId = 3, CityId = 5}
};



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () =>
{
    return dogs.Select( d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name
    });
});

app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);
    if (dog == null)
    {
        return Results.NotFound();
    }
    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);

    return Results.Ok(new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        Walker = walker == null ? null : new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        },
        CityId = dog.CityId,
        City = city == null ? null : new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        }
    });
});


app.MapGet("/api/cities", () => 
{
     return cities.Select( c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});



app.Run();
