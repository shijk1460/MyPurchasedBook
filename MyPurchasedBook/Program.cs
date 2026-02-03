var builder = WebApplication.CreateBuilder(args);

//Add
builder.Services.AddRazorPages();
//builder.Logging.ClearProviders();
builder.Logging.AddLog4Net();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

if (!app.Environment.IsDevelopment())
{
    builder.WebHost.UseUrls("http://*:80", "https://*.443");
}

//ADD
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//Add
app.MapRazorPages();
app.MapFallbackToController("Index", "Home");

app.Run();
