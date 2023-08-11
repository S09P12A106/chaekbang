package com.jsix.chaekbang.domain.group.dto;

import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.web.bind.annotation.RequestParam;

@Getter
@Setter
public class GroupSearchRequestDto {

    private String keyword;
    private List<Long> tags;
    private int pageNum;
    private int pageSize;

    public GroupSearchRequestDto(){
        this.pageNum = 0;
        this.pageSize = 1;
    }

}
