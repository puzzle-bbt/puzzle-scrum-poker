package ch.puzzle.bbt.puzzlescrumpoker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

	@RequestMapping(value = "/**/{path:[^\\.]*}")
	public String redirect() {
		return "forward:/";
	}

}
