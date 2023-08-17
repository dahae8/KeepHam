package com.ssafy.keepham.domain.menu.service;

import com.ssafy.keepham.domain.menu.dto.menu.response.MenuResponse;
import com.ssafy.keepham.domain.menu.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class MenuService {
    private final MenuRepository menuRepository;


    public List<MenuResponse> getMenus(int storeId){
        return menuRepository.findByStoreId(storeId).stream()
                .map((MenuResponse::from))
                .toList();
    }
}
