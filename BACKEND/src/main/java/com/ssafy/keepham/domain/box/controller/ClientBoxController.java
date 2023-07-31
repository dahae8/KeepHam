package com.ssafy.keepham.domain.box.controller;

import com.ssafy.keepham.domain.box.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/box")
public class ClientBoxController {
    private final BoxService boxService;

    @Autowired
    public ClientBoxController(BoxService boxService){

        this.boxService = boxService;
    }

}
