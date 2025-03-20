package com.stockai.backend.utils.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

@Converter(autoApply = true)
public class StringArrayConverter implements AttributeConverter<List<String>, String[]> {
    @Override
    public String[] convertToDatabaseColumn(List<String> strings) {
        if (strings == null || strings.isEmpty()) {
            return new String[0];
        }
        // PostgreSQL lưu mảng dạng {value1,value2}
        return strings.toArray(new String[strings.size()]);
    }

    @Override
    public List<String> convertToEntityAttribute(String[] dbData) {
        if (dbData == null) {
            return new ArrayList<>();
        }
        return List.of(dbData);
    }
}
