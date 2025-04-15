using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Pandauth.API;
using Pandauth.API.Options;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddOptions<CorsOptions>()
    .Bind(config.GetRequiredSection(CorsOptions.SectionName))
    .ValidateOnStart();

builder.Services.AddOptions<JwtOptions>()
    .Bind(config.GetRequiredSection(JwtOptions.SectionName))
    .ValidateOnStart();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var folder = Environment.SpecialFolder.LocalApplicationData;
    var path = Environment.GetFolderPath(folder);
    var dbPath = Path.Join(path, "books.db");

    options.UseSqlite($"Data Source={dbPath}");
});

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtOptions = config.GetSection(JwtOptions.SectionName).Get<JwtOptions>() ?? throw new Exception("JwtOptions was not set");

        options.Authority = jwtOptions.Issuer;
        options.RequireHttpsMetadata = false;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            NameClaimType = "preferred_username",
        };
    });

builder.Services.AddCors(options =>
{
    var corsOptions = config.GetSection(CorsOptions.SectionName).Get<CorsOptions>() ?? throw new Exception("CorsOptions was not set");
    options.AddDefaultPolicy(p => p
        .WithOrigins(corsOptions?.AllowedOrigins ?? [])
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
