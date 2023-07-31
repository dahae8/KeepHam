package com.ssafy.keepham.domain.box.controller;

import com.ssafy.keepham.domain.box.dto.BoxDTO;
import com.ssafy.keepham.domain.box.entity.Box;
import com.ssafy.keepham.domain.box.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/boxs")
public class SuperBoxController {
    private final BoxService boxService;

    @Autowired
    public SuperBoxController(BoxService boxService){

        this.boxService = boxService;
    }

    // 함생성
    @PostMapping
    public Box createBox(@RequestBody Box box){
        return boxService.saveBox(box);
    }

    //특정 id의 함 조회
    @GetMapping("/{boxId}")
    public BoxDTO getBox(@PathVariable Long boxId){
        return boxService.getBoxById(boxId);
    }

    //삭제로 변환 box들 조회
    @GetMapping
    public List<BoxDTO> getAllBox(){
        return boxService.getAllBox();
    }

    //박스 수정
    @PutMapping("/{boxId}")
    public Box updateBox(@PathVariable Long boxId, @RequestBody Box box){
        box.setBoxId(boxId);
        return boxService.updateBox(box);
    }

    //박스 삭제 상태로 전환
    @PutMapping("/delete/{boxId}")
    public Box deleteBox(@PathVariable Long boxId){
        return boxService.deleteBox(boxId);
    }





}
