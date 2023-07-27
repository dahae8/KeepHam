package com.ssafy.keepham.domain.box.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/box")
public class BoxController {
    private final BoxService boxService;
    private final PartitionService partitionService;


    @Autowired
    public BoxController(BoxService boxService, PartitionService partitionService){

        this.boxService = boxService;
        this.partitionService = partitionService;
    }

    @PostMapping
    public Box createBox(@RequestBody Box box){
        long boxId = box.getBoxId();
        int capacity = box.getCapacity();
        Partition partition = new Partition(boxId, "비점유");

        for (int i =0; i<capacity;i++){
            partitionService.savePartition(partition);
        }

        return boxService.saveBox(box);
    }

}
