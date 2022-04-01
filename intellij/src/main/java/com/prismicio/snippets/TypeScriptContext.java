package com.prismicio.snippets;

import com.intellij.codeInsight.template.TemplateActionContext;
import com.intellij.codeInsight.template.TemplateContextType;
import org.jetbrains.annotations.NotNull;

public class TypeScriptContext extends TemplateContextType {
    protected TypeScriptContext() {
        super("TYPESCRIPT", "TypeScript");
    }

    @Override
    public boolean isInContext(@NotNull TemplateActionContext templateActionContext) {
        return templateActionContext.getFile().getName().endsWith(".ts");
    }
}
