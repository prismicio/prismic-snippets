package com.prismicio.snippets;

import com.intellij.codeInsight.template.TemplateActionContext;
import com.intellij.codeInsight.template.TemplateContextType;
import org.jetbrains.annotations.NotNull;

public class JavaScriptContext extends TemplateContextType {
    protected JavaScriptContext() {
        super("JAVASCRIPT", "JavaScript");
    }

    @Override
    public boolean isInContext(@NotNull TemplateActionContext templateActionContext) {
        return templateActionContext.getFile().getName().endsWith(".js");
    }
}
