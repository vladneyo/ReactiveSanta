using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("test")]
public class TestController : ControllerBase
{
    [HttpGet]
    public ActionResult Get()
    {
        return Ok("works");
    }
}