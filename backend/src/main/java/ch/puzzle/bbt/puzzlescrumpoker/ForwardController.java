package ch.puzzle.bbt.puzzlescrumpoker;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController implements ErrorController {

	// configured within application.properties
	private static final String SERVER_ERROR_PATH = "/error";

	@RequestMapping(value=SERVER_ERROR_PATH)
	public String error() {
		return "forward:/index.html";
	}
}