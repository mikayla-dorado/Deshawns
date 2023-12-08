using Microsoft.AspNetCore.Authorization.Infrastructure;
using DeshawnsDogWalking.Models;
using DeshawnsDogWalking.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Charlotte", WalkerId = 2, CityId = 3},
    new Dog { Id = 2, Name = "Mabel", WalkerId = 3, CityId = 1},
    new Dog { Id = 3, Name = "Charlie", WalkerId = 3, CityId = 2},
    new Dog { Id = 4, Name = "Samson", WalkerId = 1, CityId = 4},
    new Dog { Id = 5, Name = "Scout", WalkerId = null, CityId = 1},
    new Dog { Id = 6, Name = "Benny", WalkerId = null, CityId = 2},
    new Dog { Id = 7, Name = "Sadie", WalkerId = null, CityId = 5},
    new Dog { Id = 8, Name = "Rufus", WalkerId = 4, CityId = 4}
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
    new Walker { Id = 3, Name = "Reiken"},
    new Walker { Id = 4, Name = "Hunter"}
};


List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id = 1, WalkerId = 1, CityId = 1},
    new WalkerCity { Id = 2,  WalkerId = 2, CityId = 2},
    new WalkerCity { Id = 3, WalkerId = 3, CityId = 3},
    new WalkerCity { Id = 4, WalkerId = 2, CityId = 4},
    new WalkerCity { Id = 5, WalkerId = 3, CityId = 5},
    new WalkerCity { Id = 6, WalkerId = 4, CityId = 1}
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
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        CityId = d.CityId
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



//this is a POST request to create a new dog
app.MapPost("/api/dogs", (Dog dog) =>
{
    //this sets the Id of the incoming dog object
    //it assigns a new identifier to the dog
    //calculated as the maximum existing dog Id, + 1 to get the next dog Id
    //dog.Id = dogs.Max(d => d.Id) + 1;
    //this finds a city in the collection of cities,
    //where the city's Id matches the cityId property of the incoming dog
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);

    //if the city variable is null, it will return a bad request result
    if (city == null)
    {
        return Results.BadRequest();
    }

    //if the city is found, aka not null, the incoming dog object is added to a collection named 'dogs'
    dogs.Add(dog);

    //if successfully added, a 201 result is returned
    return Results.Created($"/api/dogs/{dog.Id}", new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId
    });
});


app.MapGet("/api/cities", () =>
{
    return cities.Select(c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});

app.MapGet("/api/cities/{id}", (int id) =>
{
    //finds the city in the 'cities' collection with the specified ID
    City city = cities.FirstOrDefault(c => c.Id == id);
    //if the city is not found
    if (city == null)
    {
        //return 404 error
        return Results.NotFound();
    }
    //find all WalkerCity instances related to the found city
    List<WalkerCity> foundWalkerCities = walkerCities.Where(wc => wc.CityId == id).ToList();
    //for each walkerCity, find the corresponding Walker in the 'walkers' collection
    List<Walker> foundWalkers = foundWalkerCities.Select(wc => walkers.First(w => w.Id == wc.WalkerId)).ToList();

    //set properties of the CityDTO based on the found city
    return Results.Ok(new CityDTO
    {
        Id = city.Id,
        Name = city.Name,
        //for each found Walker,create a WalkerDTO and add it to the Walkers list
        Walkers = foundWalkers.Select(fw => new WalkerDTO
        {
            Id = fw.Id,
            Name = fw.Name
        }).ToList()
    });
});

app.MapGet("/api/walkers", () =>
{
    return walkers.Select(w => new WalkerDTO
    {
        Id = w.Id,
        Name = w.Name
    });
});

app.MapGet("/api/walkers/{id}", (int id) =>
{
    //find the walker in the 'walkers' collection with the specified ID
    Walker walker = walkers.FirstOrDefault(w => w.Id == id);
    //checks if walker is not found
    if (walker == null)
    {
        //returns a 404 error
        return Results.NotFound();
    }
    //find all WalkerCity instances related to the found walker
    List<WalkerCity> foundWalkerCities = walkerCities.Where(wc => wc.WalkerId == id).ToList();
    //for each WalkerCity, find the corresponding city in the 'cities' collection
    List<City> foundCities = foundWalkerCities.Select(wc => cities.First(c => c.Id == wc.CityId)).ToList();

    //set properties of the WalkerDTO based on the found walker
    return Results.Ok(new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name,
        //for each found City, create a CityDTO and add it to the Cities list
        Cities = foundCities.Select(fc => new CityDTO
        {
            Id = fc.Id,
            Name = fc.Name
        }).ToList()
    });
});


//this handles a PUT request to update info about a dog
//takes a integer id and a Dog object as the request body
app.MapPut("/api/dogs/{id}", (int id, Dog dog) =>
{
    //finds the first dog in the 'dogs' collection that has the specified ID
    //the result is stored in the variable 'dogUpdate'
    Dog dogUpdate = dogs.FirstOrDefault(d => d.Id == id);

    //checks if dog was not found
    if (dogUpdate == null)
    {
        //if not found, returns 404 error
        return Results.NotFound();
    }
    //checks if provided ID in the request body(dog.Id) 
    //matches the ID in the route parameter(id)
    if (id != dog.Id)
    {
        //if there is a mismatch, a 400 error is returned
        return Results.BadRequest();
    }

    //updated the properties of the found dog with the data from the request body(dog)
    dogUpdate.Name = dog.Name;
    dogUpdate.WalkerId = dog.WalkerId;
    dogUpdate.CityId = dog.CityId;

    //returns a 204 No Content response to indicate a successful update with no additional content
    return Results.NoContent();
});


app.MapPost("/api/cities", (City city) =>
{
    city.Id = cities.Max(c => c.Id) + 1;
    cities.Add(city);

    return Results.Created($"/api/cities/{city.Id}", new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    });
});


app.MapPut("/api/walkers/{id}", (int id, Walker walker) =>
{
    //filters out all entires in the 'walkerCities' collection where the 'walkerId' is not equal to 'walker.Id'
    //this effectively removes all existing city associateions for the walker being updated
    walkerCities = walkerCities.Where(wc => wc.WalkerId != walker.Id).ToList();

//this loop iterates over the 'Cities' property of the incoming 'walker' object
    foreach (City city in walker.Cities)
    {
        //for each city in the walker's updated list, it creates a new 'WalkerCity' object
        //with the 'WalkerId' set to the 'walker.Id' and the 'City.Id' set to the 'city.Id'
        WalkerCity newWC = new WalkerCity
        {
            WalkerId = walker.Id,
            CityId = city.Id
        };
        //assigns a unique identifier ('Id') to the new 'WalkerCity' object
        //if there are existing entries in 'walkerCities', it calculates the next available identifier
        //otherwise it sets the identifier to 1
        newWC.Id = walkerCities.Count > 0 ? walkerCities.Max(wc => wc.Id) + 1 : 1;
        //adds the new 'WalkerCity' object to the 'walkerCities' collection
        walkerCities.Add(newWC);
    }

//retrieves the walker from the 'walkers' collection based on provided 'id'
    Walker walkerUpdate = walkers.FirstOrDefault(w => w.Id == id);
    if (walkerUpdate == null)
    {
        return Results.NotFound();
    }
    if (id != walker.Id)
    {
        return Results.BadRequest();
    }

    walkerUpdate.Name = walker.Name;

    return Results.NoContent();
});

app.MapDelete("/api/dogs/{id}", (int id) => 
{
    Dog dogDelete = dogs.FirstOrDefault(d => d.Id == id);
    if (dogDelete == null)
    {
        return Results.NotFound();
    }
    dogs.Remove(dogDelete);

    return Results.NoContent();
});


app.MapDelete("/api/walkers/{id}", (int id) =>
{
    Walker walkerDelete = walkers.FirstOrDefault(w => w.Id == id);
    if (walkerDelete == null)
    {
        return Results.NotFound();
    }
    walkers.Remove(walkerDelete);

//this filters the 'dogs' collection, & selects only those dogs where the 'WalkerId' is equal to the provided 'id'
//then the filtered dogs are converted into a list
//for each dog in the filtered list, it sets the 'WalkerId' property to 'null'
    dogs.Where(dog => dog.WalkerId == id).ToList().ForEach(dog => dog.WalkerId = null);

    return Results.NoContent();
});


//the Walker Delete endpoint dissociates dogs from a walker by nullifying their 'WalkerId' property

app.Run();